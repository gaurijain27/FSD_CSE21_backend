const http = require('http');
const fs = require('fs');

const PORT = 3000;
const indexPath = `${__dirname}/index.html`;
const studentsPath = `${__dirname}/students.json`;

function readStudents() {
  try {
    const data = fs.readFileSync(studentsPath, 'utf8');
    const students = JSON.parse(data);
    return Array.isArray(students) ? students : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

function send(response, statusCode, contentType, body) {
  response.writeHead(statusCode, { 'Content-Type': `${contentType}; charset=utf-8` });
  response.end(body);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

function studentsPage(students) {
  const rows = students.length
    ? students.map((student) => `<tr><td>${escapeHtml(student.name)}</td><td>${escapeHtml(student.rollNumber)}</td><td>${escapeHtml(student.course)}</td><td>${escapeHtml(student.email)}</td></tr>`).join('')
    : '<tr><td colspan="4">No student records yet.</td></tr>';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Student Directory</title><style>
    *{box-sizing:border-box}body{margin:0;color:#222;background:#f4f4f4;font:16px Arial,sans-serif}.page{width:min(900px,calc(100% - 32px));margin:auto;padding:32px 0}a{color:#2563eb;font-weight:bold}h1{margin:20px 0 10px;font-size:32px}.count{color:#666;font-size:14px}.table-box{overflow-x:auto;background:#fff;border:1px solid #ccc}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:12px;border-bottom:1px solid #ccc}th{background:#f4f4f4;font-size:14px}tr:last-child td{border-bottom:0}@media(max-width:700px){h1{font-size:26px}th,td{padding:10px;font-size:14px}}
  </style></head><body><main class="page"><p><a href="/">← Add a student</a></p><h1>Student directory</h1><p class="count">${students.length} record${students.length === 1 ? '' : 's'} stored</p><div class="table-box"><table><thead><tr><th>Name</th><th>Roll number</th><th>Course</th><th>Email</th></tr></thead><tbody>${rows}</tbody></table></div></main></body></html>`;
}

const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    fs.readFile(indexPath, (error, content) => {
      if (error) return send(response, 500, 'text/plain', 'Unable to load the application.');
      send(response, 200, 'text/html', content);
    });
    return;
  }

  if (request.method === 'GET' && request.url === '/students') {
    try {
      send(response, 200, 'text/html', studentsPage(readStudents()));
    } catch (error) {
      send(response, 500, 'text/plain', 'Unable to read student records.');
    }
    return;
  }

  if (request.method === 'POST' && request.url === '/students') {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      const form = new URLSearchParams(body);
      const student = {
        name: (form.get('name') || '').trim(),
        rollNumber: (form.get('rollNumber') || '').trim(),
        course: (form.get('course') || '').trim(),
        email: (form.get('email') || '').trim()
      };

      if (Object.values(student).some((value) => !value)) {
        send(response, 400, 'text/plain', 'All student fields are required.');
        return;
      }

      try {
        const students = readStudents();
        students.push(student);
        fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2));
        response.writeHead(302, { Location: '/students' });
        response.end();
      } catch (error) {
        send(response, 500, 'text/plain', 'Unable to save the student record.');
      }
    });
    return;
  }

  send(response, 404, 'text/plain', 'Page not found.');
});

server.listen(PORT, () => {
  console.log(`Student Records app running at http://localhost:${PORT}`);
});