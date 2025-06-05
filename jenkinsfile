
pipeline {
    agent any
    
    environment {
        // Global configuration
        DOCKER_IMAGE_NAME = 'devops-demo-app'
        DOCKER_REGISTRY = 'nikhil092/cicd'
        GIT_CREDENTIALS_ID = 'git-credentials'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    // Read and calculate version
                    def packageJSON = readJSON file: 'package.json'
                    def versionParts = packageJSON.version.split(/\./)
                    def currentPatch = versionParts[2] as Integer
                    
                    // Set version variables
                    env.APP_VERSION = "${versionParts[0]}.${versionParts[1]}.${currentPatch + 1}"
                    env.DOCKER_TAG = "${env.APP_VERSION}-b${BUILD_NUMBER}"
                    env.DOCKER_IMAGE = "${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}"
                    
                    echo "Building version: ${env.APP_VERSION}"
                    echo "Docker tag: ${env.DOCKER_TAG}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
                echo "Tests passed successfully!"
            }
        }
        
        stage('Update Version') {
            steps {
                script {
                    // Update version in package.json
                    sh "npm version ${APP_VERSION} --no-git-tag-version"
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
                echo "Build completed successfully!"
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image: ${env.DOCKER_IMAGE}:${env.APP_VERSION}"
                    // Build with version tag
                    sh "docker build -t ${env.DOCKER_IMAGE}:${env.APP_VERSION} ."
                    // Add build number tag
                    sh "docker tag ${env.DOCKER_IMAGE}:${env.APP_VERSION} ${env.DOCKER_IMAGE}:${env.DOCKER_TAG}"
                    // Add latest tag
                    sh "docker tag ${env.DOCKER_IMAGE}:${env.APP_VERSION} ${env.DOCKER_IMAGE}:latest"
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'docker-registry-credentials', variable: 'DOCKER_AUTH')]) {
                    sh "echo ${DOCKER_AUTH} | docker login ${DOCKER_REGISTRY} -u username --password-stdin"
                    sh "docker push ${env.DOCKER_IMAGE}:${env.APP_VERSION}"
                    sh "docker push ${env.DOCKER_IMAGE}:${env.DOCKER_TAG}"
                    sh "docker push ${env.DOCKER_IMAGE}:latest"
                }
            }
        }
        
        stage('Deploy to Development') {
            steps {
                script {
                    echo "Deploying version ${APP_VERSION} to development environment"
                    // Example deployment command with the build number tag
                   
                }
            }
        }
        
        stage('Integration Tests') {
            steps {
                echo "Running integration tests against development environment"
                // Add integration test commands here
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: "Deploy to production?", ok: "Yes"
                script {
                    echo "Deploying version ${APP_VERSION} to production environment"
                    sh "kubectl set image deployment/prod-deployment app=${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG} --record"
                }
            }
        }
        
        stage('Commit Version Update') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${GIT_CREDENTIALS_ID}", passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        // Configure git
                        sh "git config user.email 'jenkins@example.com'"
                        sh "git config user.name 'Jenkins CI'"
                        
                        // Add the changed package.json
                        sh "git add package.json"
                        
                        // Commit and push the changes
                        sh "git commit -m 'Automated version update to ${APP_VERSION} [ci skip]'"
                        
                        // Push using the credentials
                        sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@${env.GIT_URL.replace('https://', '')} HEAD:${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline completed successfully!"
            // You could add notifications here (Slack, email, etc.)
        }
        failure {
            echo "Pipeline failed!"
            // You could add failure notifications here
        }
       
    }
}
 