namespace API.Models;

public class User{
    public long id { get; set; }
    public string? username { get; set; }

    public string? password { get; set; }

    public List<Village> villages { get; set; } = new List<Village>();
}