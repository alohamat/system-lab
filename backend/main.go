package main

import (
	"fmt"
	"lab/router"
	"net/http"
)

func main() {
	fmt.Println("hello world!")
	
	router := router.InitRouter()
	http.ListenAndServe(":8080", router)
}