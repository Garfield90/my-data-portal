package com.garfield.mydataportal.batch.job;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CatalogCollectJobConfig {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;

    @Bean
    public Job catalogCollectJob() {
        return new JobBuilder("catalogCollectJob", jobRepository)
                .start(catalogCollectStep())
                .build();
    }

    @Bean
    public Step catalogCollectStep() {
        return new StepBuilder("catalogCollectStep", jobRepository)
                .tasklet((contribution, chunkContext) -> {
                    log.info("Starting daily target DB catalog collection batch step...");
                    return RepeatStatus.FINISHED;
                }, transactionManager)
                .build();
    }
}
