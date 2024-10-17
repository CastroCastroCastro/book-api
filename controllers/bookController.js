import bookModel from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
    try{
        const books = await bookModel.findAll();
        res.json(books);
        } catch (error) {
            console.error('Failed', error);
            res.status(500).send('An error occurred while trying to retrieve the books');
        }
}
export const createBook = async (req, res) => {
    try {
        const title = req.body.title;
        const author = req.body.author;
        const description = req.body.description;
        const newBook = await bookModel.create({
            title,
            author,
            description,
        });
        res.status(201).json(newBook);
    } catch(error){
        console.error('Failed', error);
        res.status(500).send('An error occurred while trying to create the book');
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await bookModel.destroy({ where: { id } });
        return res.status(200).json({
            message: 'Libro eliminado correctamente',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Could not delete book',
            error: error.message,
        });
    }
}
export const updateBook = async (req, res) => {
    try{
      const bookId = req.params.id 
      const {title,author,description} = req.body;
      const updatedBook = await bookModel.update ({
        'title': title,
        'author': author,
        'description': description
      },{
        where: {id: bookId},
        
      });
        const book = await bookModel.findByPk (bookId)
    //   console.log(updatedBook + "Hola desde Control")
      return res.status(200).json({
        message: 'Book updated correctly',
    });
    }catch (error){
      res.json({message:error.message})
  
    }
}
