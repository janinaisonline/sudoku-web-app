# sudoku-web-app

### Deploy on Azure with Docker and Kubernetes

Start __docker desktop__ manually

To deploy globally (via ACR):
Public IP address: http://135.234.181.198/
´´´
# Need to be logged in to Azure and ACR first
        az account show (to check if already logged in)
        az login (if not logged in yet)
        az acr login --name acrsudoku (to log into the ACR)

        # First command builds the updated page and names it sudoku-web-app-frontend, second command "renames" (tags) the page with the acr name, third command pushes the new version to acr
        docker build -t sudoku-web-app-frontend ./frontend 
        docker tag sudoku-web-app-frontend acrsudoku.azurecr.io/sudoku-web-app-frontend:latest 
        docker push acrsudoku.azurecr.io/sudoku-web-app-frontend:latest

        # Force reload page after a few seconds with ctrl + f5 and it should show the updated page

        # If updates to frontend-deployment.yaml were made, execute the following two commands
        kubectl apply -f K8S/frontend-deployment.yaml
        kubectl rollout restart deployment frontend

        # For information about pods and web addresses
        kubectl get pods
        kubectl get services
´´´

To deploy locally (through Docker):
Local IP address: http://localhost:3000/
´´´
docker build -t sudoku-web-app-frontend ./frontend  //  docker-compose up --build (to build frontend and backend)
docker run -d -p 3000:80 sudoku-web-app-frontend
´´´


    ###########################################################################
    NOT RECENT ANYMORE
    ###########################################################################

    Locally with minikube:

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

    When making changes to the frontend page (when deploying through minikube):
        docker build -t janinah/sudoku-web-app-frontend ./frontend (from main folder) // docker build -t janinah/sudoku-web-app-frontend . (from frontend folder)
        docker push janinah/sudoku-web-app-frontend

        # force to pull latest
        kubectl set image deployment/frontend frontend=janinah/sudoku-web-app-frontend:latest

        # or delete and reapply
        kubectl delete deployment frontend
        kubectl apply -f K8S/frontend-deployment.yaml (from main folder) // kubectl apply -f frontend-deployment.yaml (from K8S folder) // 

        kubectl get pods
        kubectl get services
        minikube service frontend-service --url


To clean up docker:
´´´
docker images prune
docker system prune
´´´
    


