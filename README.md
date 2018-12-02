To see the swagger file of the OpenApiSpecification:
http://localhost:8080/api/v1/api-docs/

To see the online documentation:
https://d-huveau.gitbook.io/api-rest-node/

Get all students:
http://localhost:8080/api/V1/students

Get students with a limit:
http://localhost:8080/api/V1/students?max=5

Get a student from an id:
http://localhost:8080/api/V1/students/1

Add a student:
http://localhost:8080/api/V1/students
use Postman with parameter: x-www-form-urlencoded
exemple:
key = name
value = Alexendra

Update or delete a student:
http://localhost:8080/api/V1/students/1
use Postman with parameter: x-www-form-urlencoded
exemple:
key = name
value = Alexendra
