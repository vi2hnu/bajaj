export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, message: "POST method required" })
  }

  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ is_success: false, message: "Invalid request body" })
    }

    const input = Array.isArray(req.body.data) ? req.body.data : []

    const student_name = "vishnuvaradhan"
    const birthdate = "16062004"
    const email_id = "vishnuvaradhan.kr2022@vitstudent.ac.in"
    const roll_no = "22BCE00925"

    let odds = [], evens = [], letters = [], specials = [], total = 0

    for (const token of input) {
      if (typeof token !== "string") {
        specials.push(String(token))
        continue
      }
      if (/^-?\d+$/.test(token)) {
        const n = Number(token)
        total += n
        ;(n % 2 === 0 ? evens : odds).push(token)
      } else if (/^[a-zA-Z]+$/.test(token)) {
        letters.push(token.toUpperCase())
      } else {
        specials.push(token)
      }
    }

    const concat_string = letters
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 ? ch.toLowerCase() : ch.toUpperCase()))
      .join("")

    return res.status(200).json({
      is_success: true,
      user_id: `${student_name}_${birthdate}`,
      email: email_id,
      roll_number: roll_no,
      odd_numbers: odds,
      even_numbers: evens,
      alphabets: letters,
      special_characters: specials,
      sum: total.toString(),
      concat_string
    })
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Internal server error",
      details: err.message || "Unknown error"
    })
  }
}
