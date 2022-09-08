pipeline {
  agent any
   options {
    disableConcurrentBuilds()
  }
  stages {
    stage('Build - Yarn install') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Build SPA') {
      when {
        branch 'master'
      }
      steps {
        sh 'quasar build spa'
      }
    }
    stage('Build SSR') {
      when {
        branch 'production'
      }
      steps {
        sh 'quasar build -m ssr'
      }
    }
    stage('Production deploy SSR to /altisima/public-quasar-webs') {
      when {
        branch 'production'
      }
      steps {
        sh 'sudo rm -rf /altisima/public-quasar-webs/altisima-cz-web-production/*'
        sh 'cp -R dist/ssr/* /altisima/public-quasar-webs/altisima-cz-web-production'
        sh 'cd /altisima/public-quasar-webs/altisima-cz-web-production && yarn'
      }
    }
    stage('Stage deploy SPA to /altisima/public-apache-webs/altisima-cz-web-staging') {
      when {
        branch 'master'
      }
      steps {
        sh 'sudo rm -rf /altisima/public-apache-webs/altisima-cz-web-staging/www/*'
        sh 'cp -R dist/spa/* /altisima/public-apache-webs/altisima-cz-web-staging/www'
      }
    }
    stage('Restart nodejs service') {
      when {
        branch 'production'
      }
      steps {
        sh 'sudo systemctl restart altisima.cz.service'
        sh 'sudo systemctl status altisima.cz.service'
      }
    }
  }
}
