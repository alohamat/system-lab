package router

import (
	"github.com/gorilla/mux"
	"lab/handlers"
)

func InitRouter() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/login", handlers.LoginHandler)

	return router
}