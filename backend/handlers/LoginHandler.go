package handlers

import (
	"net/http"
	"lab/models"
	"encoding/json"
	"log"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var req models.Req
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {log.Fatal("shit")}
	
}