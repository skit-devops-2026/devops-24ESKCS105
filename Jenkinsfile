pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    triggers {
        githubPush()
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/skit-devops-2026/devops-24ESKCS105']]
                ])
            }
        }

        stage('Install') {
            steps {
                sh 'make install'
            }
        }

        stage('Test') {
            steps {
                sh 'make test'
            }
        }

        stage('Build') {
            steps {
                sh 'make build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'make docker-build'
            }
        }
    }

    post {
        success {
            echo 'Skill Swapify Jenkins pipeline completed successfully.'
        }
        failure {
            echo 'Skill Swapify Jenkins pipeline FAILED - check the stage logs above.'
        }
    }
}
