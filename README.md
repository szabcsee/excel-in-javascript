Write a small web-based application using php+html+css+javascript+mysql which looks and behaves like a simplified version of the well known MS Excel.

Requirements:
- use mysql to store the content
- On reloading the page looks the same as used last time and focuses cell A1
- The table must be extendable with new cols/rows
- Any of the cols/rows must be removable
- On pressing tab/enter the focus goes right/down and the cell content gets saved using ajax
- Navigate the focus using cursor keys
- no formula evaluation needed
- You provide an online working instance of your solution and leave it running for a few weeks
- Only the initial page may get html&css content from the server
- No operation may result a complete page reload after being initially loaded
- Every communication with the server must be done thru ajax calls
- No html over ajax calls, only JSON ( => content generation by js)
- OOP both in php and js is required (need classes be written by yourself and see instances working in both PHP and JS)
- No formatting by html, only by css
- The app must be able to run in any folder inside the web area, must not restrict to be placed in the root
- No PHP or JS frameworks allowed except base jQuery and jQueryUI (no jQuery extensions)
- database communication thru a db layer (like PDO), no direct mysql_* or mysqli::* calls

Apply as many as possible of the followings (all is required for 100% score):
- Communication only in JSON format in both directions (client <-> server)
- Practical db organizing
- auto format the fields based on the type of the values entered (numbers, dates aligned to the right, string to the left, etc)
- Data validation+sanitization at both client and server side
- Using only prepared statements
- apply as many security techniques as possible on both server and client side (data validation, sanitization, escaping, xss-prevention, sql-injection prevention, etc)
- MVC architecture
- Correct working in all major browsers (chrome, ffox, ie, maybe opera)
- Ergonomic UI
- Try to avoid useless files, codes and unnecessarily lengthy sources, folders
- Well organized classes in both PHP and JS
- Code comments (only the necessary ones to ease the code understanding)

Good luck!

In case of any questions just contact us in e-mail.

Thank you,
