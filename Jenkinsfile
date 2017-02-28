MAIN_BRANCH = 'master'
IS_MASTER_BUILD = (env.BRANCH_NAME == MAIN_BRANCH)

node(label: 'Small') {
  withDockerRegistry(registry: [credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/']) {
    docker.image('node:6.6.0').pull()
    withDockerContainer([image: 'node:6.6.0']) {
      stage('Checkout SCM') {
        checkout scm
      }

      stage('Check Dependencies') {
        sh 'npm install --cache=./.npm --quiet'
      }

      stage('Test') {
        sh 'npm run test'
      }

      // if (IS_MASTER_BUILD) {
      //   stage('deploy:prod') {
      //     sh 'npm run deploy:prod'
      //   }
      // }
    }
  }
}
