plugins {
    id("com.android.application")
}

android {
    namespace = "com.example.myfpl"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.myfpl"
        minSdk = 27
         versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation("androidx.lifecycle:lifecycle-livedata-ktx:2.6.1")
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.1")
    val nav_version = "2.7.5";

    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.9.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")

    implementation ("androidx.core:core-splashscreen:1.0.0")
    implementation ("androidx.navigation:navigation-fragment:$nav_version")
    implementation ("androidx.navigation:navigation-ui:$nav_version")
    // Feature module Support
    implementation ("androidx.navigation:navigation-dynamic-features-fragment:$nav_version")

    // Testing Navigation
    androidTestImplementation ("androidx.navigation:navigation-testing:$nav_version")

    // Jetpack Compose Integration
    implementation ("androidx.navigation:navigation-compose:$nav_version")
    implementation ("org.jetbrains.kotlin:kotlin-stdlib:1.8.22")
    implementation ("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.22")

    implementation ("com.squareup.retrofit2:retrofit:2.9.0")
    implementation ("com.squareup.retrofit2:converter-gson:2.0.0")

    implementation ("com.github.bumptech.glide:glide:4.15.1")

}