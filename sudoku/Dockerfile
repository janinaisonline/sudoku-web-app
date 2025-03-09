# Build Stage: Use .NET SDK to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy project file and restore dependencies
COPY SudokuApp/*.csproj .
RUN dotnet restore

# Copy all source files and build
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Runtime Stage: Use a smaller runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime  # Keep it the same version as the SDK
WORKDIR /app
COPY --from=build /app/publish .

# Expose the app on port 5099
EXPOSE 5099

# Run the application
CMD ["dotnet", "SudokuApp.dll"]  