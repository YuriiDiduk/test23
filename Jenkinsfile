pipeline {
    parameters {
        gitParameter branch: '', branchFilter: 'origin/(.*)', defaultValue: 'develop', name: 'BRANCH_NAME', quickFilterEnabled: true, selectedValue: 'DEFAULT', sortMode: 'ASCENDING_SMART', tagFilter: '*', type: 'PT_BRANCH'    }
    environment {
        JENKINS_SSHKEY = "402ac039-a02f-4f9f-85c0-60944dbb8f50"
        REGISTRY_URL = "https://nxs-develop.jelvix.dev"
        REGISTRY_NAME = "nxs-develop.jelvix.dev"
        REGISTRY_CRD = "53713aa6-2029-49af-bb88-1418bbc3a07c"
        DEPLOY_HOST = "175.15.10.25"
        APP_NAME = "nxs1"
        ENV_NAME = "dev"
        image_tag = 'latest'
    }
    agent any
    stages {
        stage('Build images') {
            steps {
                script{
                    dockerImage = docker.build("${REGISTRY_NAME}/nxs1_frontend:${BRANCH_NAME}", "--label commitId=${GIT_COMMIT}  --label branch=${GIT_BRANCH} --label buildId=${env.BUILD_NUMBER} --rm -f .docker/frontend/Dockerfile .")
                }
            }
        }
        //ferwr
        stage('Push images to registry') {
            steps {
                script {
                    if ('${BRANCH_NAME}' == 'release') {
                        image_tag = '1.0.$env.BUILD_NUMBER'
                    } else {
                        image_tag = "${BRANCH_NAME}.${env.BUILD_NUMBER}".replace('/','-')
                    } 
                    withDockerRegistry(credentialsId: "${REGISTRY_CRD}", url: "${REGISTRY_URL}")  {
                        if ('${BRANCH_NAME}' == 'master') {
                           dockerImage.push("latest")
                        } else {
                        dockerImage.push ("${image_tag}")
                        }
                    }
                }
            }
        }
        stage ('Deploy to environment') {
            steps {
                script {
                    withDockerServer(credentialsId:"${REGISTRY_CRD}", uri:"${DEPLOY_HOST}") {
                        withDockerRegistry(credentialsId: "${REGISTRY_CRD}", url: "${REGISTRY_URL}") {
                            sh "export TAG=${image_tag} && docker stack deploy --compose-file docker-compose.yml --with-registry-auth '${APP_NAME}_${ENV_NAME}'"
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Clear workspace'  
            cleanWs()
        }
    }  
}
