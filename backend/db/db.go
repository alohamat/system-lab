package db

import (
	"time"
	"os"
	"context"
	"log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectMongo() error {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		log.Fatalln("MONGO_URI is empty")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return err
	}

	DB = client.Database("labDB")

	return nil
}