pipeline {
  agent {
    docker {
      image 'vingle/lambda-microservice-template:nodejs8.10'
      label 'Small'
    }
  }

  stages {
    stage('Start') {
      steps {
        checkout scm
      }
    }

    stage('npm install') {
      steps {
        environment name: 'HOME', value: './'
        sh 'npm install --cache=./.npm --quiet'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }

    // stage('deploy:prod') {
    //   when {
    //     branch 'master'
    //   }
    //   steps {
    //     withCredentials([
    //       [
    //         $class: 'AmazonWebServicesCredentialsBinding',
    //         credentialsId: 'jenkins iam',
    //         accessKeyVariable: 'AWS_ACCESS_KEY_ID',
    //         secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
    //       ]
    //     ]) {
    //       sh 'npm run deploy:prod'
    //     }
    //   }
    // }
  }
  // post {
  //   regression {
  //     slackSend channel: '#st-web', color: 'danger', message: "${env.JOB_NAME} Regressed"
  //   }
  //   fixed {
  //     slackSend channel: '#st-web', color: 'good', message: "${env.JOB_NAME} Fixed"
  //   }
  // }
}
