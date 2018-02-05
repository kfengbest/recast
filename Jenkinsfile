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
                echo 'Packaging..'
            }
        }
        stage('Upload to S3') {
            steps {
                echo 'Upload..'
            }
        }        
        stage('Docker Build') {
            steps {
                echo 'Docker Build..'
            }
        }
        stage('Docker Push') {
            steps {
                echo 'Docker Push..'
            }
        }  
        stage('K8s Deploy') {
            steps {
                echo 'K8s Deploy..'
            }
        } 

    }
}
