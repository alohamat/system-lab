package main

import (
	"fmt"
	"net/http"

	"github.com/alohamat/system-lab/routes"
	"github.com/alohamat/system-lab/db"
)

func main() {
	router := routes.Router()
	const port string = ":8080"

	fmt.Printf("server running at %v\n", port)
	db.ConnectMongo()
	http.ListenAndServe(port, router)
}
