const API_URL = "http://localhost:8080/books";

$(document).ready(function () {
  // Mostrar modal ao clicar em "New"
  $("#newBookButton").on("click", function () {
    $("#saveBookModal").modal("show");

    // Manipular envio do formulário de adição de livro
    $("#bookSaveForm").on("submit", function (e) {
      e.preventDefault();

      const newBook = {
        name: $("#bookName").val(),
        author: $("#bookAuthor").val(),
        description: $("#bookDescription").val(),
      };

      addBook(newBook);

      $("#saveBookModal").modal("hide");

      $("#bookName").val("");
      $("#bookAuthor").val("");
      $("#bookDescription").val("");
    });
  });

  $("#books").on("click", ".editBookButton", function () {
    const id = $(this).data("id");
    fillEditModalById(id);
  });

  $("#books").on("click", ".viewBookButton", function () {
    const id = $(this).data("id");
    fillViewModalById(id);
  });

  $("#books").on("click", ".deleteBookButton", function () {
    const id = $(this).data("id");
    fillDeleteModalById(id);
  });

  $("#bookEditForm").on("submit", function (e) {
    e.preventDefault();

    const book = {
      id: $("#editBookId").val(),
      name: $("#editBookName").val(),
      author: $("#editBookAuthor").val(),
      description: $("#editBookDescription").val(),
    };

    updateBook(book);
  });

  $("#bookDeleteForm").on("submit", function (e) {
    e.preventDefault();

    const book = {
      id: $("#deleteBookId").val(),
      name: $("#deleteBookName").val(),
      author: $("#deleteBookAuthor").val(),
      description: $("#deleteBookDescription").val(),
    };

    deleteBook(book);
  });

  function fillEditModalById(id) {
    $.ajax({
      type: "GET",
      url: `${API_URL}/${id}`,
      success: function (book) {
        $("#editBookId").val(book.id);
        $("#editBookName").val(book.name);
        $("#editBookAuthor").val(book.author);
        $("#editBookDescription").val(book.description);
        $("#editBookModal").modal("show");
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }

  function fillDeleteModalById(id) {
    $.ajax({
      type: "GET",
      url: `${API_URL}/${id}`,
      success: function (book) {
        $("#deleteBookId").val(book.id);
        $("#deleteBookName").val(book.name);
        $("#deleteBookAuthor").val(book.author);
        $("#deleteBookDescription").val(book.description);
        $("#deleteBookModal").modal("show");
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }

  function fillViewModalById(id) {
    $.ajax({
      type: "GET",
      url: `${API_URL}/${id}`,
      success: function (book) {
        $("#viewBookId").val(book.id);
        $("#viewBookName").val(book.name);
        $("#viewBookAuthor").val(book.author);
        $("#viewBookDescription").val(book.description);
        $("#viewBookModal").modal("show");
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }

  //#region API_FUNCTIONS
  function getBooks() {
    $.ajax({
      type: "GET",
      url: API_URL,
      success: function (data) {
        showBooks(data);
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }

  function addBook(book) {
    $.ajax({
      type: "POST",
      url: API_URL,
      contentType: "application/json",
      data: JSON.stringify(book),
      success: function () {
        getBooks();
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }

  function updateBook(book) {
    $.ajax({
      type: "PUT",
      url: `${API_URL}/${book.id}`,
      contentType: "application/json",
      data: JSON.stringify(book),

      success: function () {
        getBooks();
        $("#editBookModal").modal("hide");
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }

  function deleteBook(book) {
    $.ajax({
      type: "DELETE",
      url: `${API_URL}/${book.id}`,
      contentType: "application/json",
      data: JSON.stringify(book),

      success: function () {
        getBooks();
        $("#deleteBookModal").modal("hide");
      },
      error: function (xhr, status, error) {
        console.error("HTTP-Error: " + xhr.status, error);
      },
    });
  }
  function showBooks(books) {
    let table = "";

    books.forEach((book) => {
      table += `<tr>
                  <td scope="row">${book.id}</td>
                  <td>${book.name}</td>
                  <td>${book.author}</td>
                  <td>${book.description}</td>
                  <td>
                    <button id="viewBookButton" class="viewBookButton btn btn-secondary btn-sm"
                    data-id="${book.id}">
                      View
                    </button>
                    <button id="editBookButton" class="editBookButton btn btn-primary btn-sm" 
                    data-id="${book.id}">
                      Edit
                    </button>
                    <button id="deleteBookButton" class="deleteBookButton btn btn-danger btn-sm" 
                    data-id="${book.id}">
                      Delete
                    </button>
                  </td>
                </tr>`;
    });
    $("#books").html(table);
  }

  getBooks();
  //#endregion
});
