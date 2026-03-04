package main

import (
	"fmt"
	"net/http"
	"github.com/alohamat/system-lab/routes"
)

func main() {
	router := routes.Router()
	const port string = ":8080"

	fmt.Printf("server running at %v", port)
	http.ListenAndServe(port, router)
}