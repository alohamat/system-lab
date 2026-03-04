package routes

import (
	"github.com/alohamat/system-lab/handlers"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/login", handlers.LoginHandler)

	return router
}