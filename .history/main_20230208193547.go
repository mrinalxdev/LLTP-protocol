package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", fileServer)
	http.HandleFunc("/form", forHandler)
	http.HandleFunc("/hello", helloHandle)

	fmt.Printf("Starting Server at port 8000")
	if err := http.ListenAndServe("")
}