namespace FunnyVaultFS.Models
{
    public class Meme
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Content { get; set; }
        public string? ImagePath { get; set; }
        public int Score { get; set; }
        public bool IsCringe { get; set; }
    }
}
