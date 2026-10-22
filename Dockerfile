FROM golang:1.27-alpine AS build

WORKDIR /app
COPY . .

RUN go build -ldflags="-w -s"

FROM alpine:latest AS run

WORKDIR /app

COPY --from=build /app/dankscreen ./dankscreen

EXPOSE 8989

CMD ["./dankscreen"]
