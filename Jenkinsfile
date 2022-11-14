pipeline {
    agent any
    parameters { choice(name: 'ENVIRONMENT', choices: ['Develop', 'Staging', 'Production'], description: 'Pick something')}
    environment {
        AWS_ACCOUNT_ID="605060434181"
        AWS_DEFAULT_REGION="us-east-1"
        IMAGE_REPO_NAME="gstt"
        IMAGE_TAG="v1"
        REPOSITORY_URI = "605060434181.dkr.ecr.us-east-1.amazonaws.com/gstt"
        ENVIRONMENT = "dev"
        APP_NAME = "gstt"
        DOCKER_FILE_BACKEND = ".docker/frontend/Dockerfile"
        SWARM_MANAGER_IP = "172.31.26.2"
    }
   
    stages {
        
         stage('Logging into AWS ECR') {
            steps {
                script {
                 sh """aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"""
                }
                 
            }
        }
        
        
        stage ('Deploy -- [ DEVELOP ] -- environment') {
            when {
                expression {
                    return params.ENVIRONMENT == 'Develop';
                }
            }
            steps {
                //  First: change git URL
                checkout([$class: 'GitSCM', branches: [[name: '*/develop']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/YuriiDiduk/test23.git']]])
                
                
              //  script {
              //      withCredentials([file(credentialsId: '!!1f079c05-a818-45c6-8fe1-dbf716e08396', variable: 'ENV_FILE')]) {
              //          sh 'cat $ENV_FILE > .env'
              //      }
              //  }
                
                
                script {
 
 
                    dockerImage = docker.build("${IMAGE_REPO_NAME}:${IMAGE_TAG}", "-f ${DOCKER_FILE_BACKEND} .")
                    
                     }
            }            
        }
        
   stage('Pushing to ECR') {
     steps{  
         script {
                IMMAGE_TAG = "${ENVIRONMENT}.FE.${env.BUILD_NUMBER}".replace('/','-')
                
                sh """docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMMAGE_TAG"""
               // sh """docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"""
               sh """docker push ${REPOSITORY_URI}:${IMMAGE_TAG}"""
         }
                  
 
        }
      }
      
      
      stage('Deploy to dev') {
     steps{  
         script {
  
               IMMAGE_TAG = "${ENVIRONMENT}.FE.${env.BUILD_NUMBER}".replace('/','-')
                sh "export TAG=${IMMAGE_TAG} && docker -H tcp://${SWARM_MANAGER_IP}:2375 stack deploy --compose-file docker-compose.yml --with-registry-auth '${APP_NAME}_${ENVIRONMENT}'"
              
                  
             }
         
 
        }
      }
        
 
    }
    
    post {
        always {
            script {
                sh 'docker image prune -f && docker container prune -f'
                
            }
            echo 'Clear workspace'
            cleanWs()
        }
    }
}
