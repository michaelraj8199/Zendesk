const qrCode = require('qrcode')
const { uploadFile } = require('./FileHandler')
require('dotenv').config()

const generate_qrCode = async (adminId, businessName) => {
  let url = `${process.env.QR_CODE_INPUT_URL}`
  qrCode.toBuffer(url, { type: 'image/png' }, function (error, res) {
    if (error) return console.log(error)

    let file = {
      buffer: res,
    }
    uploadFile(adminId, file, 'qrcode').then((resp) => {
      return resp
    })
  })
}

module.exports = { generate_qrCode }
