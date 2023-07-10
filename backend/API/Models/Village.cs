using System.Text.Json.Serialization;

namespace API.Models;

public class Village{
    public long id { get; set; }

    public string? name { get; set; }

    public string? description { get; set; }

    public string? imageUrl { get; set; }

    public string? location { get; set; }

    public string? address { get; set; }

    public string? phone { get; set; }

    public string? email { get; set; }

    public string? website { get; set; }

    public List<Amenities> Amenities { get; set; } = new List<Amenities>();
}

public class Amenities{
    public long id { get; set; }

    public string? name { get; set; }

    public string? description { get; set; }

    public string? emojiUrl { get; set; }

    public long? villageId { get; set; }

    [JsonIgnore]
    public Village? Village { get; set; }
}