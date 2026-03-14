package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/alohamat/system-lab/db"
	"github.com/alohamat/system-lab/models"
	"github.com/alohamat/system-lab/services"
	"go.mongodb.org/mongo-driver/bson"

	"golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	var user models.User
	collection := db.DB.Collection("usersCollection")

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		fmt.Printf("loginhandler error: %v", err)
		return
	}
	// fmt.Printf("Username: %v\nPassword: %v\n", req.Username, req.Password)

	err = collection.FindOne(
		context.Background(),
		bson.M{"username": req.Username},
	).Decode(&user)

	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(req.Password),
	)

	token, err := services.GenerateJWT(user.Username)
	if err != nil {
		http.Error(w, "Token error", http.StatusInternalServerError)
		return
	}

	resp := LoginResponse{
		Token: token,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
