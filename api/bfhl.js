
export default function handler(req, res) {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ success: false, message: "POST method required" });
    }
  
    try {
      const payload = req.body || {};
      const input = payload.data ?? [];
  
      const student_name = "vishnu";   
      const birthdate = "20091606";      
      const email_id = "vishnuvaradhan.kr2022@vitstudent.ac.in";   
      const roll_no = "22BCE00925";        
  
      const odds = [];
      const evens = [];
      const letters = [];
      const specials = [];
      let total = 0;
  
      for (const token of input) {
        if (/^-?\d+$/.test(token)) {
          const n = Number(token);
          total += n;
          (n % 2 === 0 ? evens : odds).push(token);
        } else if (/^[a-zA-Z]+$/.test(token)) {
          letters.push(token.toUpperCase());
        } else {
          specials.push(token);
        }
      }
  
      const reversedCaps = letters
        .join("")
        .split("")
        .reverse()
        .map((ch, i) => (i % 2 ? ch.toLowerCase() : ch.toUpperCase()))
        .join("");
  
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
  concat_string: reversedCaps 
});

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  