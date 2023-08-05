## running
- running code locally
```bash
dotnet run
```

## setup
- run the following code to get an example project
```bash
dotnet new webapi -o {name}
cd {name}
dotnet add package Microsoft.EntityFrameworkCore.InMemory
code -r ../{name}
```
- Trust the HTTPS development certificate```dotnet dev-certs https --trust```
- test using postman
  - run with ```dotnet run```
  - visit `http://localhost:5219/weatherforecast` to verify running
- add domain models
  - create a folder named `Models`
  - add a class named `listItem`
    - create your API class inside this file
  - add a class named `ListContext`
    - this is a class to connect the model to your DB
- edit `Program.cs`
  - add `using {name}.Models;` to the top
  - add `services.AddDbContext<ListContext>(opt => opt.UseInMemoryDatabase("ListItems"));` 

- add packages required for controllers
```bash 
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design -v 7.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design -v 7.0.0
dotnet add package Microsoft.EntityFrameworkCore.SqlServer -v 7.0.0
```
```bash
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
```
- run the following code to genorate controlers
```bash
dotnet-aspnet-codegenerator controller -name ListController -async -api -m ListItem -dc ListContext -outDir Controllers
```
- test controller is working
- run dotnet ```dotnet run```
- test using postman
  - post `http://localhost:5219/api/list`
  - add json data to the body of the request
  ```json
    {
        "name": "carrots",
        "isComplete": false
    }
  ```
  - get `http://localhost:5219/api/list` to verify successful post


## Problems encountered  
- not connecting components in get method,
  - get method would constantly return empty amenities list
  - fixed by adding ```.include()``` to the get methods