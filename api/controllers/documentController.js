const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAllDocuments = async (req, res) => {
  try{
    let documents = prisma.documents.findAll()
    res.status(200).json(documents)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}