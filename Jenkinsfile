pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Packaging'){
            steps {
                sh "git archive -v -o artifect.zip --format=zip HEAD"
            }
        }
        stage('Upload to S3') {
            steps {
                withAWS(region:"us-east-1",credentials:"global_usnp_aws_r") {
                    s3Upload(file:"artifect.zip", bucket:"cp-docker2-stg-s3-eb",path:"artifect.zip")
                }
            }
        }        
        stage('Docker Build') {
            steps {
                sh "docker build -t kfengbest/mst-js-recast:latest ."
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                sh 'docker push kfengbest/mst-js-recast:latest'
                }
            }
        }
        stage('update version'){
            steps {
                sh "sed -i -e 's/RECAST_VERSION/${BUILD_NUMBER}/g' k8s/app-deployment.yaml"
                sh "cat k8s/app-deployment.yaml"
            }
        }  
        stage('K8s Deploy') {
            steps {
                kubernetesDeploy(
                        credentialsType: 'KubeConfig',
                        kubeConfig: [path: '/usr/share/jenkins/ref/init.groovy.d/kubeconfig'],
                        configs: 'k8s/*.yaml',
                        enableConfigSubstitution: false,
                )
            }
        } 

    }
}
