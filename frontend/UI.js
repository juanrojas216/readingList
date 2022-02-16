import BookService from "./services/bookService";
const bookService = new BookService();
import {format} from "timeago.js";

class UI {

    async renderBooks(){
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById("books-cards");
        booksCardContainer.innerHTML = '';
        books.forEach(book => {
            const mainDiv = document.createElement("div");
            mainDiv.className = "";
            mainDiv.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="http://192.168.0.108:3000${book.imagePath}" alt="" class="img-fluid"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.createdAt)}
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(mainDiv);
        });
    }

    async addNewBook(book){
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm(){
        document.getElementById("book-form").reset();
    }

    renderMessage(message, color, time){
        const mainDiv = document.createElement("div");
        mainDiv.className= `alert alert-${color} message`;
        mainDiv.appendChild(document.createTextNode(message));

        const container = document.querySelector(".col-md-4");
        const bookForm = document.querySelector("#book-form");

        container.insertBefore(mainDiv, bookForm);
        setTimeout(() => {
            document.querySelector(".message").remove();
        },time);

    }

    async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }

}

export default UI;