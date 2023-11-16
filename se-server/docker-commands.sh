export DOCKER_DEFAULT_PLATFORM=linux/amd64
docker build .
docker tag se-server-server:latest us-west1-docker.pkg.dev/involuted-disk-405316/se-project/se-server 
docker push us-west1-docker.pkg.dev/involuted-disk-405316/se-project/se-server