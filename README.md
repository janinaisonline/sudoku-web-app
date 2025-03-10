# sudoku-web-app
Starting out to build a sudoku web application


How to get everything up and running with Docker and Kubernetes (minikube):

    Start docker desktop manually

    CMD:
        minikube start

        docker-compose -f K8S/docker-compose.yaml up --build
        
        (
            docker-compose up --build
            docker-compose up --build frontend (if only one) -> http://localhost:3000/
            docker-compose up --build backend (if only one)
        )

        kubectl apply -f K8S/frontend-deployment.yaml
        kubectl apply -f K8S/frontend-service.yaml
        kubectl apply -f K8S/backend-deployment.yaml
        kubectl apply -f K8S/backend-service.yaml

        kubectl get pods
        kubectl get services

        minikube service frontend-service --url

    When making changes to the frontend page:
        docker build -t janinah/sudoku-web-app-frontend . (from frontend folder) // docker build -t janinah/sudoku-web-app-frontend ./frontend (from main folder)
        docker push janinah/sudoku-web-app-frontend

        # force to pull latest
        kubectl set image deployment/frontend frontend=janinah/sudoku-web-app-frontend:latest

        # or delete and reapply
        kubectl delete deployment frontend
        kubectl apply -f frontend-deployment.yaml (from K8S folder) // kubectl apply -f K8S/frontend-deployment.yaml (from main folder)

        kubectl get pods
        kubectl get services
        minikube service frontend-service --url

    To deploy globally (via ACR):
        docker tag sudoku-web-app-frontend acrsudoku.azurecr.io/sudoku-web-app-frontend:latest
        docker push acrsudoku.azurecr.io/sudoku-web-app-frontend:latest
        
        kubectl apply -f K8S/frontend-deployment.yaml
        kubectl rollout restart deployment frontend

        kubectl get pods
        kubectl get services



