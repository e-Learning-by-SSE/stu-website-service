pipeline {
    agent any

    tools {nodejs "NodeJS 16.13"}
    
    environment {
        DEMO_SERVER = '147.172.178.30'
        DEMO_SERVER_PORT = '8080'
        API_FILE = 'api-json'
        API_URL = "http://${env.DEMO_SERVER}:${env.DEMO_SERVER_PORT}/stmgmt/${env.API_FILE}"
    }
    
    stages {

        stage('Git') {
            steps {
                cleanWs()
                git 'https://github.com/Student-Management-System/StudentMgmt-Backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            environment {
                POSTGRES_DB = 'StudentMgmtDb'
                POSTGRES_USER = 'postgres'
                POSTGRES_PASSWORD = 'admin'
                PORT = '5432'
            }
            steps {
                script {
                    // Sidecar Pattern: https://www.jenkins.io/doc/book/pipeline/docker/#running-sidecar-containers
                    docker.image('postgres:14.1-alpine').withRun("-e POSTGRES_USER=${env.POSTGRES_USER} -e POSTGRES_PASSWORD=${env.POSTGRES_PASSWORD} -e POSTGRES_DB=${env.POSTGRES_DB} -p ${env.PORT}:${env.PORT}") { c ->
                        sh 'npm run test:jenkins'
                    }
                }
                step([
                    $class: 'CloverPublisher',
                    cloverReportDir: 'output/test/coverage/',
                    cloverReportFileName: 'clover.xml',
                    healthyTarget: [methodCoverage: 70, conditionalCoverage: 80, statementCoverage: 80],   // optional, default is: method=70, conditional=80, statement=80
                    unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50], // optional, default is none
                    failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]       // optional, default is none
                ])
            }
            post {
                always {
                    junit 'output/**/junit*.xml'
               }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                sh 'rm -f Backend.tar.gz'
                sh 'tar czf Backend.tar.gz dist src test config package.json ormconfig.ts tsconfig.json'
            }
        }

        // Based on: https://medium.com/@mosheezderman/c51581cc783c
        stage('Deploy') {
            steps {
                sshagent(credentials: ['Stu-Mgmt_Demo-System']) {
                    sh """
                        [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                        ssh-keyscan -t rsa,dsa example.com >> ~/.ssh/known_hosts
                        ssh -i ~/.ssh/id_rsa_student_mgmt_backend elscha@${env.DEMO_SERVER} <<EOF
                            cd ~/StudentMgmt-Backend
                            git reset --hard
                            git pull
                            npm install
                            rm ~/.pm2/logs/npm-error.log
                            pm2 restart 0 --wait-ready # requires project intialized with: pm2 start npm -- run start:demo
                            cd ..
                            sleep 30
                            ./chk_logs_for_err.sh
                            exit
                        EOF"""
                }
                findText(textFinders: [textFinder(regexp: '(- error TS\\*)|(Cannot find module.*or its corresponding type declarations\\.)', alsoCheckConsoleOutput: true, buildResult: 'FAILURE')])
                sh "wget ${env.API_URL}"
            }
        }

        stage('API Client') {
            // Execute this step only if Version number was changed
            // Based on: https://stackoverflow.com/a/57823724
            when { changeset "src/main.ts"}
            steps {
                // TODO: API Generation here
                build job: 'Teaching_StudentMgmt-API-Client', wait: false
                sh 'echo "API potentially changed"'
                // sh 'rm -rf gen-jenkins/api-client'
                // sh 'npm install @openapitools/openapi-generator-cli'
                // sh "npx openapi-generator-cli generate -i ${env.API_URL} -g typescript-angular -o gen-jenkins/api-client"
                // sh "tar czf api-client.tar.gz --directory=gen-jenkins api-client"
            }
        }
        
        stage('Publish Results') {
            steps {
                archiveArtifacts artifacts: '*.tar.gz'
                archiveArtifacts artifacts: "${env.API_FILE}"
            }
        }

        stage("Trigger Downstream Projects") {
            steps {
                build job: 'Teaching_StuMgmtDocker', wait: false
                build job: 'Teaching_StudentMgmt-Backend-API-Gen', wait: false
            }
        }
    }
}