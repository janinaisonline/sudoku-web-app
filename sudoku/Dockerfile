# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY SudokuApp/SudokuApp.csproj SudokuApp/
WORKDIR /app/SudokuApp
RUN dotnet restore

# Copy all source files
COPY . .

# Remove obj and bin before building
RUN rm -rf /app/SudokuApp/bin /app/SudokuApp/obj

# Restore dependencies again AFTER deletion
RUN dotnet restore

# Build and publish
RUN dotnet build -c Release --no-restore
RUN dotnet publish -c Release -o /app/publish --no-restore

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5099
EXPOSE 5099

CMD ["dotnet", "SudokuApp.dll"]



# # Build Stage: Use .NET SDK to build the app
# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# WORKDIR /app

# # Copy project file and restore dependencies
# COPY SudokuApp/*.csproj ./SudokuApp/
# WORKDIR /app/SudokuApp
# RUN dotnet restore

# # # Copy all source files and build
# COPY . .
# RUN dotnet publish -c Release -o /app/publish
# # RUN dotnet publish -c Release -o /app/publish --no-restore

# # # Copy all source files, EXCEPT bin/ and obj/
# # COPY . .
# # # RUN dotnet clean
# # # RUN rm -rf /app/SudokuApp/bin /app/SudokuApp/obj  # 🔹 Ensures old build files are removed
# # # RUN dotnet restore
# # # RUN dotnet publish -c Release -o /app/publish

# # # 🟢 Ensure a fresh build and remove stale files
# # RUN dotnet clean
# # RUN rm -rf /app/SudokuApp/bin /app/SudokuApp/obj

# # # 🟢 Regenerate the project.assets.json by forcing restore
# # RUN dotnet restore --force

# # # 🟢 Force a rebuild of AssemblyInfo to prevent duplicate attributes
# # RUN dotnet build -c Release --no-restore

# # # 🟢 Publish the app (now with a fresh build)
# # RUN dotnet publish -c Release -o /app/publish --no-restore



# # Runtime Stage: Use a smaller runtime image
# FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime 
# WORKDIR /app
# COPY --from=build /app/publish .

# # Set .NET to listen on port 5099
# ENV ASPNETCORE_URLS=http://+:5099

# # Expose the app on port 5099
# EXPOSE 5099

# # Run the application
# CMD ["dotnet", "SudokuApp.dll"]  