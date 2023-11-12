pipeline {
    agent {
        kubernetes {
            inheritFrom 'default'
        }
    }

    options {
        skipStagesAfterUnstable()
    }

    stages {
        stage('Clone repository') { 
            steps { 
                script {
                    checkout scm
                }
            }
        }

        stage('Build') { 
            steps { 
                echo 'Empty'
            }
        }

        stage('Test'){
            steps {
                echo 'Empty'
            }
        }

        stage('Build Docker Registry') {
            steps {
                container('docker') {
                    script {
                        docker.withRegistry("https://${env.DEVOPS_REGISTRY_ADDRESS}", 'DEVOPS_CONTAINER_REGISTRY_CREDS') {
                            def image = docker.build("shopping-list-server")
                            image.push("${env.BUILD_ID}")
                            image.push("latest")
                        }
                    }
                }
            }
        }
    }
}
