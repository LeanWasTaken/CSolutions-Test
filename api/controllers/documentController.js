const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAllDocuments = async (req, res) => {
  try{
    let documents = await prisma.document.findMany()
    res.status(200).json(documents)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getDocumentById = async (req, res) => {
  try {
    const { id } = req.params
    let document = await prisma.document.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        configurations: true
      }
    })

    if (!document) {
      return res.status(404).json({ message: 'Dokuments netika atrasts.' });
    }

    const response = {
      documentName: document.document_name,
      fields: document.configurations.map((config) => ({
        id: config.id,
        field_seq: config.field_seq,
        is_mandatory: config.is_mandatory,
        field_type: config.field_type,
        field_name: config.field_name,
        document_id: config.document_id,
        select_values: config.select_values,
      })),
    }



    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.createDocument = async (req, res) => {
  const { document_name, form_values } = req.body;

  if (!document_name || !form_values) {
    return res.status(400).json({ message: "Trūkst 'document_name' vai 'form_values'"})
  }

  try {
    const createdDocument = await prisma.document.create({
      data: {
        document_name,
        configurations: {
          create: form_values.map((formValue) => ({
            field_seq: parseInt(formValue.field_seq),
            is_mandatory: Boolean(formValue.is_mandatory),
            field_type: parseInt(formValue.field_type),
            field_name: formValue.field_name,
            select_values: {
              create: formValue.select_values.map((selectValue) => ({
                value: selectValue.value,
                label: selectValue.label,
              })),
            },
          })),
        },
      },
      include: {
        configurations: true,
      },
    });

    res.status(200).json(createdDocument);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}