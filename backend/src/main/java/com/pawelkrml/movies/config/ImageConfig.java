package com.pawelkrml.movies.config;

import javax.imageio.spi.IIORegistry;

import org.springframework.context.annotation.Configuration;

import com.luciad.imageio.webp.WebPImageWriterSpi;

import jakarta.annotation.PostConstruct;

@Configuration
public class ImageConfig {

  @PostConstruct
  public void registerWebPWriter() {
    IIORegistry registy = IIORegistry.getDefaultInstance();
    registy.registerServiceProvider(new WebPImageWriterSpi());
  }
}
