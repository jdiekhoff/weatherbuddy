using WeatherBuddy.Api.Configuration;

namespace WeatherBuddy.Api.Extensions
{
  public static class ServiceCollectionExtensions {
    public static void AddOpenWeatherMapConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
      var openWeatherMapSection = configuration.GetSection("OpenWeatherMap");
      services.Configure<OpenWeatherMapConfiguration>(openWeatherMapSection);
    }
  }
}
