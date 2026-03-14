package middlewares

import (
	"net/http"

	"github.com/rs/cors"
)

func CorsMiddleware(handler http.Handler) http.Handler {
	return cors.New(cors.Options{	
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"POST", "GET", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "Access-Control-Allow-Origin"},
		AllowCredentials: true,
	}).Handler(handler)
}
