# sudoku-web-app
Starting out to build a sudoku web application


How to get everything up and running with Docker and Kubernetes (minikube):

    Start docker desktop manually

    CMD:
        minikube start

        docker-compose up --build
            docker-compose up --build frontend (if only one) -> http://localhost:3000/
            docker-compose up --build backend (if only one)

        kubectl apply -f frontend-deployment.yaml
        kubectl apply -f frontend-service.yaml
        kubectl apply -f backend-deployment.yaml
        kubectl apply -f backend-service.yaml

        kubectl get pods
        kubectl get services

        minikube service frontend-service --url

    When making changes to the frontend page:
        docker build -t janinah/sudoku-web-app-frontend .
        docker push janinah/sudoku-web-app-frontend

        # force to pull latest
        kubectl set image deployment/frontend frontend=janinah/sudoku-web-app-frontend:latest

        # or delete and reapply
        kubectl delete deployment frontend
        kubectl apply -f frontend-deployment.yaml

        kubectl get pods
        kubectl get services
        minikube service frontend-service --url



