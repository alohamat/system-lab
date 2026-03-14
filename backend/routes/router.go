package routes

import (
	"github.com/gorilla/mux"

	"github.com/alohamat/system-lab/handlers"
	"github.com/alohamat/system-lab/middlewares"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/login", handlers.LoginHandler)
	router.Use(middlewares.CorsMiddleware)

	return router
}
