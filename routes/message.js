const express = require("express")
const auth = require("../middleware/auth")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const router = express.Router()
router.post("/", auth, async (req, res) => {
    const { message } = req.body
    const result = await prisma.message.create({
        data: { message: message }
    })

    res.status(201).send("Created Successfully").json(result)
})

router.get("/", auth, async (req, res) => {
    const message = await prisma.message.findMany()
    res.status(200).json(message)
})

router.put("/:id", auth, async (req, res) => {
    const { id } = req.params
    const { message } = req.body
    const result = await prisma.message.update(
        {
            where: { id: Number(id) },
            data: { message }
        }
    )
    res.status(200).json(result)
})

router.delete("/:id", auth, async (req, res) => {
    const { id } = req.params
    const result = await prisma.message.delete(
        {
            where: { id: Number(id) }
        }
    )
    res.status(204).json(result)
})

module.exports = router