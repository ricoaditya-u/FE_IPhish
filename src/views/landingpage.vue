<template>
    <div class="landing-page">
        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <h1>Welcome to iPhish</h1>
                <p>Your trusted partner in innovation and quality.</p>
                <button @click="goToDashboard()">Learn More</button>
            </div>
        </section>

        <!-- About Section -->
        <section class="about">
            <div class="container">
                <h2>About Us</h2>
                <p>
                We are a forward-thinking company specializing in innovative
                solutions that drive business success. Our mission is to empower
                organizations with modern technology and design.
                </p>
            </div>
        </section>

        <!-- Our Clients Section -->
        <section class="clients">
            <div class="container">
                <h2>Our Clients</h2>
                <div class="client-carousel">
                <div class="client-logo" v-for="(client, index) in clients" :key="index">
                    <img :src="client.logo" :alt="client.name" />
                </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()
const clients = ref([
    { name: "Client 1", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Client 2", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Client 3", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
    ]);

function goToDashboard(data) {
    router.push('/dashboard')
}
</script>

<style scoped>
    .landing-page {
        font-family: "Poppins", sans-serif;
        color: #111;
        background: #fff;
    }

    /* Hero Section */
    .hero {
        text-align: center;
        padding: 100px 20px;
        background: linear-gradient(135deg, #0a0a0a, #1c1c1c);
        color: white;
    }
    .hero h1 {
        font-size: 48px;
        font-weight: 700;
    }
    .hero p {
        margin: 15px 0 25px;
        font-size: 18px;
    }
    .hero button {
        background-color: #1e90ff;
        border: none;
        padding: 12px 30px;
        color: white;
        font-size: 16px;
        border-radius: 30px;
        cursor: pointer;
        transition: 0.3s;
    }
    .hero button:hover {
        background-color: #0078ff;
    }

    /* About Section */
    .about {
        text-align: center;
        padding: 80px 20px;
        background: #f8f9fa;
    }
    .about h2 {
        font-size: 32px;
        margin-bottom: 20px;
    }

    /* Clients Section */
    .clients {
        padding: 80px 20px;
        text-align: center;
    }
    .clients h2 {
        font-size: 32px;
        margin-bottom: 40px;
        color: #111;
    }
    .client-carousel {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        flex-wrap: wrap;
    }
    .client-logo img {
        width: 120px;
        height: auto;
        filter: grayscale(100%);
        transition: all 0.3s;
    }
    .client-logo img:hover {
        filter: grayscale(0%);
        transform: scale(1.05);
    }
</style>
