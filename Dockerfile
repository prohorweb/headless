FROM alpine:latest
RUN apk add --no-cache unzip curl
ARG PB_VERSION=0.23.4
RUN wget -q https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip -O /tmp/pb.zip && \
    unzip /tmp/pb.zip -d /pb/ && \
    rm /tmp/pb.zip && \
    chmod +x /pb/pocketbase
EXPOSE 8090
WORKDIR /pb
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data"]
