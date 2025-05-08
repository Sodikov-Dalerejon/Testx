const express = require("express")
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken")
const authM = require("../middleware/auth")

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password, role } = req.body
    if (!username && !password) {
        return res.send("No username or password").status(401)
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const result = await prisma.users.create(
        {
            data: { username, password: hashedPwd, role }
        }
    )
    res.status(201).json(result)
})

router.post("/", async (req, res) => {
    const { username, password, role } = req.body
    if (!username && !password) {
        return res.send("No username or password").status(400)
    }
    const user = await prisma.users.findFirst(
        {
            where: { username: username }
        }
    )
    if (!user) {
        return res.status(401).send("Credentials are incorrect")
    }
    const result = bcrypt.compare(password, user.password)
    if (!result) {
        return res.status(400).send("Credentials are incorrect")
    }
    const token = jwt.sign({ username: user.username }, "qwerty25$")
    res.header("x-auth-token", token).send("Auth was successful!).status(200)
})
router.put("/update/:id", authM, async (req, res) => {
    const { username, password } = req.body
    const { id } = req.params
    const hashedPwd = await bcrypt.hash(password, 10)
    const userU = await prisma.users.update({
        where: { id: Number(id) },
        data: { username, password: hashedPwd }
    })
    res.send(userU)
})
router.delete("/delete/:id", authM, async (req, res) => {
    const { id } = req.params
    const userD = await prisma.users.delete({
        where: { id: Number(id) }
    })
    res.status(204).send(userD)
})

router.get("/daler/username", authM, async (req, res) => {
    const data = await prisma.users.findMany()
    res.send(data)
})
module.exports = router
